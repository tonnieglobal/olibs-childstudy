import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  User, Mail, Phone, Lock, Briefcase, 
  BookOpen, Video, FileText, Users, 
  CheckCircle2, ChevronRight, ChevronLeft,
  Upload, Star, X, Loader2, AlertTriangle
} from "lucide-react";
import { useFirebase } from "../contexts/FirebaseContext";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL, UploadTask } from "firebase/storage";
import { db, storage } from "../lib/firebase";

const STEPS = [
  { id: 1, title: "Basic Info", icon: User },
  { id: 2, title: "Expertise", icon: Briefcase },
  { id: 3, title: "Credentials", icon: Upload },
  { id: 4, title: "References", icon: Users },
];

export function TutorOnboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const { profile, user } = useFirebase();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [activeUploads, setActiveUploads] = useState<Record<string, {
    name: string;
    progress: number;
    status: "uploading" | "success" | "error";
    task: UploadTask;
    error?: string;
  }>>({});

  const [formData, setFormData] = useState({
    // Step 1
    fullName: profile?.displayName || "",
    email: user?.email || "",
    password: "",
    phone: "",
    // Step 2
    experience: "",
    subjects: [] as string[],
    bio: "",
    // Step 3
    videoUrl: "",
    credentialUrls: [] as string[],
    // Step 4
    references: [{ name: "", contact: "", relationship: "" }],
    guarantors: [{ name: "", contact: "" }],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};
    if (step === 1) {
      if (!formData.fullName) newErrors.fullName = "Full name is required";
      if (!formData.email) {
        newErrors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Invalid email format";
      }
      if (!formData.password) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }
      if (!formData.phone) {
        newErrors.phone = "Phone number is required";
      } else {
        const phoneRegex = /^(0|\+\d{1,3})\d{9,10}$/;
        if (!phoneRegex.test(formData.phone.replace(/\s/g, ""))) {
          newErrors.phone = "Invalid format. Use +[country code] or 0";
        }
      }
    } else if (step === 2) {
      if (!formData.experience) newErrors.experience = "Please state your experience";
      if (formData.subjects.length === 0) newErrors.subjects = "Select at least one subject";
      if (formData.bio.length < 50) newErrors.bio = "Bio must be at least 50 characters";
    } else if (step === 3) {
      if (!formData.videoUrl) newErrors.video = "Introductory video is required";
      if (formData.credentialUrls.length < 2) newErrors.credentials = "Please upload both Degree/TRCN and ID Card";
    } else if (step === 4) {
      const firstRef = formData.references[0];
      if (!firstRef.name || !firstRef.contact) newErrors.references = "At least one complete reference is required";
      const firstGua = formData.guarantors[0];
      if (!firstGua.name || !firstGua.contact) newErrors.guarantors = "At least one complete guarantor is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleFileUpload = async (file: File, type: "video" | "credential", slot?: string) => {
    if (!user) return;
    
    if (type === "video" && !file.type.startsWith("video/")) {
      alert("Please upload a valid video file.");
      return;
    }

    const uploadKey = slot || type;
    const folder = type === "video" ? "tutor_videos" : "tutor_credentials";
    const storageRef = ref(storage, `${folder}/${user.uid}/${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    setActiveUploads(prev => ({
      ...prev,
      [uploadKey]: {
        name: file.name,
        progress: 0,
        status: "uploading",
        task: uploadTask
      }
    }));

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setActiveUploads(prev => ({
          ...prev,
          [uploadKey]: prev[uploadKey] ? { ...prev[uploadKey], progress } : prev[uploadKey]
        }));
      },
      (error) => {
        console.error("Upload error:", error);
        if (error.code === "storage/canceled") {
          setActiveUploads(prev => {
            const next = { ...prev };
            delete next[uploadKey];
            return next;
          });
          return;
        }
        setActiveUploads(prev => ({
          ...prev,
          [uploadKey]: { ...prev[uploadKey], status: "error", error: "Upload failed. Try again." }
        }));
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        if (type === "video") {
          setFormData(prev => ({ ...prev, videoUrl: downloadURL }));
        } else {
          // If it's a specific slot, we might want to store it more structured, 
          // but for now we follow the existing credentialUrls logic
          setFormData(prev => ({ 
            ...prev, 
            credentialUrls: [...prev.credentialUrls, downloadURL] 
          }));
        }
        setActiveUploads(prev => ({
          ...prev,
          [uploadKey]: { ...prev[uploadKey], status: "success", progress: 100 }
        }));
      }
    );
  };

  const cancelUpload = (key: string) => {
    const upload = activeUploads[key];
    if (upload && upload.status === "uploading") {
      upload.task.cancel();
    }
    setActiveUploads(prev => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;
    if (!user) return;

    setIsSubmitting(true);
    try {
      // Update the main user document
      await updateDoc(doc(db, "users", user.uid), {
        isVerified: false, // Wait for admin approval
        displayName: formData.fullName
      });

      // Create detailed tutor profile
      await setDoc(doc(db, "tutors", user.uid), {
        userId: user.uid,
        bio: formData.bio,
        experience: formData.experience,
        subjects: formData.subjects,
        introVideoUrl: formData.videoUrl,
        references: formData.references,
        guarantors: formData.guarantors,
        isApproved: false,
        rating: 0,
        reviewCount: 0,
        createdAt: new Date().toISOString()
      });

      navigate("/tutor");
    } catch (error) {
      console.error(error);
      alert("Failed to save profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = (currentStep / STEPS.length) * 100;

  return (
    <div className="min-h-screen bg-surface py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-ink mb-4">Complete your Tutor Profile</h1>
          <p className="text-gray-500">Join our network of elite tutors and start making an impact.</p>
        </div>

        {/* Progress Tracker */}
        <div className="mb-12">
          <div className="flex justify-between mb-4">
            {STEPS.map((step) => (
              <div key={step.id} className="flex flex-col items-center gap-2">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                  currentStep >= step.id ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-white text-gray-300 border border-gray-100"
                }`}>
                  <step.icon size={20} />
                </div>
                <span className={`text-xs font-bold uppercase tracking-widest ${
                  currentStep >= step.id ? "text-primary" : "text-gray-400"
                }`}>
                  {step.title}
                </span>
              </div>
            ))}
          </div>
          <div className="h-2 bg-white rounded-full overflow-hidden border border-gray-50">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-primary"
            />
          </div>
        </div>

        {/* Form Area */}
        <div className="bg-white rounded-[2.5rem] p-8 lg:p-12 shadow-2xl shadow-primary/5 border border-primary/5 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 uppercase tracking-widest ml-1">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="text"
                          value={formData.fullName}
                          onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                          className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      {errors.fullName && <p className="text-red-500 text-xs font-bold ml-1">{errors.fullName}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 uppercase tracking-widest ml-1">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      {errors.email && <p className="text-red-500 text-xs font-bold ml-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 uppercase tracking-widest ml-1">Password</label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="password"
                          value={formData.password}
                          onChange={(e) => setFormData({...formData, password: e.target.value})}
                          className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      {errors.password && <p className="text-red-500 text-xs font-bold ml-1">{errors.password}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 uppercase tracking-widest ml-1">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="tel"
                          placeholder="+234..."
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      {errors.phone && <p className="text-red-500 text-xs font-bold ml-1">{errors.phone}</p>}
                    </div>
                  </div>
                  <div className="p-6 bg-blue-50/50 rounded-2xl border border-blue-100 flex gap-4">
                    <CheckCircle2 className="text-blue-600 shrink-0" size={24} />
                    <p className="text-sm text-blue-700">Your information is protected by our professional verification system. Only approved staff can view your credentials.</p>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-8">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-widest ml-1">Teaching Experience</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {["0-2 years", "3-5 years", "5-10 years", "10+ years"].map((exp) => (
                        <button
                          key={exp}
                          onClick={() => setFormData({...formData, experience: exp})}
                          className={`py-4 rounded-2xl font-bold transition-all ${
                            formData.experience === exp ? "bg-primary text-white" : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                          }`}
                        >
                          {exp}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-widest ml-1">Subjects of Specialization</label>
                    <div className="flex flex-wrap gap-3">
                      {["Mathematics", "English", "Further Math", "Physics", "Chemistry", "Biology", "Literature", "Government"].map((s) => {
                        const isSelected = formData.subjects.includes(s);
                        return (
                          <button
                            key={s}
                            onClick={() => {
                              const newSubjects = isSelected
                                ? formData.subjects.filter(sub => sub !== s)
                                : [...formData.subjects, s];
                              setFormData({...formData, subjects: newSubjects});
                            }}
                            className={`px-5 py-3 rounded-2xl text-sm font-bold transition-all border-2 flex items-center gap-2 group ${
                              isSelected 
                                ? "border-primary bg-primary text-white shadow-xl shadow-primary/20 scale-105" 
                                : "border-gray-100 bg-gray-50 text-gray-500 hover:border-primary/20 hover:bg-white hover:text-primary"
                            }`}
                          >
                            <AnimatePresence>
                              {isSelected && (
                                <motion.div
                                  initial={{ scale: 0, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  exit={{ scale: 0, opacity: 0 }}
                                >
                                  <CheckCircle2 size={16} />
                                </motion.div>
                              )}
                            </AnimatePresence>
                            {s}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-widest ml-1">Professional Bio</label>
                    <textarea
                      placeholder="Tell parents about your teaching style and success stories..."
                      rows={5}
                      value={formData.bio}
                      onChange={(e) => setFormData({...formData, bio: e.target.value})}
                      className="w-full p-6 bg-gray-50 border-none rounded-3xl focus:ring-2 focus:ring-primary h-40 resize-none"
                    />
                    <div className="flex justify-between px-1">
                       <p className="text-xs text-gray-400">Min 50 characters required</p>
                       <p className={`text-xs font-bold ${formData.bio.length < 50 ? "text-orange-500" : "text-green-500"}`}>{formData.bio.length} characters</p>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-8">
                  <div className={`p-8 border-2 border-dashed rounded-[2.5rem] text-center transition-all relative overflow-hidden ${
                    activeUploads["video"]?.status === "success" || formData.videoUrl ? "border-secondary bg-secondary/5" : "border-primary/20 bg-primary/5 group hover:border-primary/40"
                  }`}>
                    {(activeUploads["video"]?.status === "success" || formData.videoUrl) && (
                      <div className="absolute top-4 right-4 animate-in fade-in zoom-in duration-500">
                        <CheckCircle2 className="text-secondary" size={24} />
                      </div>
                    )}

                    <div className={`w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl transition-all ${
                      (activeUploads["video"]?.status === "success" || formData.videoUrl) ? "text-secondary shadow-secondary/10" : "text-primary shadow-primary/10"
                    }`}>
                      {activeUploads["video"]?.status === "uploading" ? (
                        <Loader2 className="animate-spin" size={40} />
                      ) : (activeUploads["video"]?.status === "success" || formData.videoUrl) ? (
                        <CheckCircle2 size={40} />
                      ) : (
                        <Video size={40} />
                      )}
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2">
                      {!activeUploads["video"] && !formData.videoUrl && "Introductory Video"}
                      {activeUploads["video"]?.status === "uploading" && "Uploading Video..."}
                      {(activeUploads["video"]?.status === "success" || formData.videoUrl) && "Video Uploaded Successfully!"}
                      {activeUploads["video"]?.status === "error" && "Upload Failed"}
                    </h3>
                    
                    <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto tracking-wide">
                      {activeUploads["video"]?.status === "uploading" ? (
                        <span className="font-mono text-xs text-primary">{activeUploads["video"].name}</span>
                      ) : (activeUploads["video"]?.status === "success" || formData.videoUrl) ? (
                        "You can still replace the video by clicking below."
                      ) : (
                        "Record a short 1-min video introducing yourself. Tutors with videos get 80% more bookings."
                      )}
                    </p>

                    {activeUploads["video"]?.status === "uploading" && (
                      <div className="space-y-4 mb-6">
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs font-bold text-primary px-1">
                            <span>{Math.round(activeUploads["video"].progress)}% Complete</span>
                            <button 
                              onClick={() => cancelUpload("video")}
                              className="text-red-500 flex items-center gap-1 hover:underline"
                            >
                              <X size={14} /> Cancel
                            </button>
                          </div>
                          <div className="w-full max-w-xs mx-auto h-2 bg-gray-100 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${activeUploads["video"].progress}%` }}
                              className="h-full bg-primary"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    <label className={`inline-block cursor-pointer ${activeUploads["video"]?.status === "uploading" ? "opacity-50 pointer-events-none" : ""}`}>
                      <input
                        type="file"
                        accept="video/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload(file, "video");
                        }}
                      />
                      <div className={`px-8 py-3 font-bold rounded-2xl hover:scale-105 transition-transform flex items-center gap-2 mx-auto ${
                        (activeUploads["video"]?.status === "success" || formData.videoUrl) ? "bg-secondary text-white" : "bg-primary text-white"
                      }`}>
                        <Upload size={18} /> {(activeUploads["video"]?.status === "success" || formData.videoUrl) ? "Change Video" : "Upload Video"}
                      </div>
                    </label>

                    {activeUploads["video"]?.status === "error" && (
                      <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-xl">
                        <p className="text-red-500 text-sm font-bold flex items-center justify-center gap-2">
                          <AlertTriangle size={16} />
                          {activeUploads["video"].error}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-bold text-gray-700 uppercase tracking-widest ml-1">Credentials & Certifications</label>
                      <button className="text-xs font-bold text-primary italic underline">Guidelines</button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                       {/* Slot 1: Degree */}
                       <div className="space-y-2">
                        <label className={`p-6 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center transition-all cursor-pointer relative overflow-hidden w-full ${
                          activeUploads["degree"]?.status === "uploading" ? "border-primary/40 bg-primary/5" :
                          activeUploads["degree"]?.status === "success" || formData.credentialUrls.length >= 1 ? "border-secondary bg-secondary/5 text-secondary" : 
                          "border-gray-100 text-gray-400 hover:border-primary/20 hover:bg-gray-50"
                        }`}>
                            <input 
                              type="file" 
                              className="hidden" 
                              disabled={activeUploads["degree"]?.status === "uploading"}
                              onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], "credential", "degree")} 
                            />
                            
                            {activeUploads["degree"]?.status === "uploading" ? (
                              <Loader2 className="animate-spin mb-2" size={24} />
                            ) : (activeUploads["degree"]?.status === "success" || formData.credentialUrls.length >= 1) ? (
                              <CheckCircle2 size={24} className="mb-2" />
                            ) : (
                              <FileText size={24} className="mb-2" />
                            )}
                            
                            <span className="text-xs font-bold uppercase tracking-tighter">
                              {activeUploads["degree"]?.status === "uploading" ? "Uploading..." : "Degree / TRCN"}
                            </span>

                            {activeUploads["degree"]?.status === "uploading" && (
                              <div className="absolute inset-0 bg-primary/5 flex flex-col items-center justify-center p-4">
                                <div className="text-[10px] font-bold text-primary mb-1 truncate w-full text-center">{activeUploads["degree"].name}</div>
                                <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                                  <div className="h-full bg-primary" style={{ width: `${activeUploads["degree"].progress}%` }} />
                                </div>
                                <button 
                                  onClick={(e) => { e.preventDefault(); cancelUpload("degree"); }}
                                  className="mt-2 text-[10px] font-black text-red-500 hover:underline"
                                >
                                  CANCEL
                                </button>
                              </div>
                            )}
                        </label>
                        {activeUploads["degree"]?.status === "error" && <p className="text-[10px] text-red-500 font-bold ml-2">{activeUploads["degree"].error}</p>}
                       </div>

                       {/* Slot 2: ID Card */}
                       <div className="space-y-2">
                        <label className={`p-6 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center transition-all cursor-pointer relative overflow-hidden w-full ${
                          activeUploads["id_card"]?.status === "uploading" ? "border-primary/40 bg-primary/5" :
                          activeUploads["id_card"]?.status === "success" || formData.credentialUrls.length >= 2 ? "border-secondary bg-secondary/5 text-secondary" : 
                          "border-gray-100 text-gray-400 hover:border-primary/20 hover:bg-gray-50"
                        }`}>
                            <input 
                              type="file" 
                              className="hidden" 
                              disabled={activeUploads["id_card"]?.status === "uploading"}
                              onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], "credential", "id_card")} 
                            />
                            
                            {activeUploads["id_card"]?.status === "uploading" ? (
                              <Loader2 className="animate-spin mb-2" size={24} />
                            ) : (activeUploads["id_card"]?.status === "success" || formData.credentialUrls.length >= 2) ? (
                              <CheckCircle2 size={24} className="mb-2" />
                            ) : (
                              <CheckCircle2 size={24} className="mb-2 p-0.5 opacity-50" />
                            )}

                            <span className="text-xs font-bold uppercase tracking-tighter">
                              {activeUploads["id_card"]?.status === "uploading" ? "Uploading..." : "ID Card"}
                            </span>

                            {activeUploads["id_card"]?.status === "uploading" && (
                              <div className="absolute inset-0 bg-primary/5 flex flex-col items-center justify-center p-4">
                                <div className="text-[10px] font-bold text-primary mb-1 truncate w-full text-center">{activeUploads["id_card"].name}</div>
                                <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                                  <div className="h-full bg-primary" style={{ width: `${activeUploads["id_card"].progress}%` }} />
                                </div>
                                <button 
                                  onClick={(e) => { e.preventDefault(); cancelUpload("id_card"); }}
                                  className="mt-2 text-[10px] font-black text-red-500 hover:underline"
                                >
                                  CANCEL
                                </button>
                              </div>
                            )}
                        </label>
                        {activeUploads["id_card"]?.status === "error" && <p className="text-[10px] text-red-500 font-bold ml-2">{activeUploads["id_card"].error}</p>}
                       </div>
                    </div>
                    {errors.credentials && <p className="text-red-500 text-xs font-bold ml-1">{errors.credentials}</p>}
                    {errors.video && <p className="text-red-500 text-xs font-bold ml-1">{errors.video}</p>}
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-8">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-primary font-bold">
                         <Users size={20} />
                         <h3>Reference Details</h3>
                      </div>
                      <button 
                        onClick={() => setFormData({...formData, references: [...formData.references, { name: "", contact: "", relationship: "" }]})}
                        className="text-xs font-bold text-primary hover:underline"
                      >
                        + Add Reference
                      </button>
                    </div>
                    <div className="space-y-4">
                      {formData.references.map((ref, i) => (
                        <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <input
                            placeholder="Name"
                            className="p-4 bg-gray-50 border-none rounded-xl text-sm"
                            value={ref.name}
                            onChange={(e) => {
                               const newRefs = [...formData.references];
                               newRefs[i].name = e.target.value;
                               setFormData({...formData, references: newRefs});
                            }}
                          />
                          <input
                            placeholder="Contact"
                            className="p-4 bg-gray-50 border-none rounded-xl text-sm"
                            value={ref.contact}
                            onChange={(e) => {
                               const newRefs = [...formData.references];
                               newRefs[i].contact = e.target.value;
                               setFormData({...formData, references: newRefs});
                            }}
                          />
                          <input
                            placeholder="Relationship"
                            className="p-4 bg-gray-50 border-none rounded-xl text-sm"
                            value={ref.relationship}
                            onChange={(e) => {
                               const newRefs = [...formData.references];
                               newRefs[i].relationship = e.target.value;
                               setFormData({...formData, references: newRefs});
                            }}
                          />
                        </div>
                      ))}
                    </div>
                    {errors.references && <p className="text-red-500 text-xs font-bold ml-1">{errors.references}</p>}
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-secondary font-bold">
                         <Shield size={20} className="text-secondary" />
                         <h3>Guarantor Details</h3>
                      </div>
                      <button 
                        onClick={() => setFormData({...formData, guarantors: [...formData.guarantors, { name: "", contact: "" }]})}
                        className="text-xs font-bold text-secondary hover:underline"
                      >
                        + Add Guarantor
                      </button>
                    </div>
                    <div className="space-y-4">
                      {formData.guarantors.map((gua, i) => (
                        <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input
                            placeholder="Full Name"
                            className="p-4 bg-gray-50 border-none rounded-xl text-sm"
                            value={gua.name}
                            onChange={(e) => {
                               const newGuas = [...formData.guarantors];
                               newGuas[i].name = e.target.value;
                               setFormData({...formData, guarantors: newGuas});
                            }}
                          />
                          <input
                            placeholder="Phone / Address"
                            className="p-4 bg-gray-50 border-none rounded-xl text-sm"
                            value={gua.contact}
                            onChange={(e) => {
                               const newGuas = [...formData.guarantors];
                               newGuas[i].contact = e.target.value;
                               setFormData({...formData, guarantors: newGuas});
                            }}
                          />
                        </div>
                      ))}
                    </div>
                    {errors.guarantors && <p className="text-red-500 text-xs font-bold ml-1">{errors.guarantors}</p>}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Footer Navigation */}
          <div className="mt-12 pt-8 border-t border-gray-100 flex justify-between items-center">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className="flex items-center gap-2 text-gray-400 font-bold hover:text-ink transition-colors disabled:opacity-0"
            >
              <ChevronLeft size={20} /> Back
            </button>

            {currentStep < STEPS.length ? (
              <button
                onClick={handleNext}
                className="px-8 py-4 bg-primary text-white font-bold rounded-2xl flex items-center gap-2 hover:scale-105 transition-all shadow-lg shadow-primary/20"
              >
                Continue <ChevronRight size={20} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-10 py-4 bg-secondary text-white font-bold rounded-2xl flex items-center gap-2 hover:scale-105 transition-all shadow-lg shadow-secondary/20 disabled:opacity-50"
              >
                {isSubmitting ? "Finalizing..." : "Submit Application"}
                <CheckCircle2 size={20} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Shield(props: any) {
    return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path></svg>
}
