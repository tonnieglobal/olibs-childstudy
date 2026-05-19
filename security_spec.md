# Security Specification - Olibs ChildStudy

## Data Invariants
1. A **User** document must have a `uid` matching the document ID and `auth.uid`.
2. A **TutorProfile** can only be created by a user with the `tutor` role.
3. Only **Admins** can approve a tutor (`isApproved`).
4. **Lessons** can only be created by **Parents**.
5. **Lessons** can only be read by the `parentUid`, `tutorUid`, or an **Admin**.
6. **Reviews** can only be created for a `completed` lesson by the `parentUid`.
7. **Notifications** are private and can only be read/updated by the target `userId`.
8. users cannot change their own `role` or `isVerified` status after creation.

## The Dirty Dozen Payloads

1. **Identity Theft**: Parent A attempts to update Parent B's user profile.
2. **Privilege Escalation**: A tutor attempts to set `role: "admin"` in their own profile.
3. **Ghost Approval**: A tutor attempts to set `isApproved: true` in their own tutor profile.
4. **Illegal Lesson**: A tutor attempts to create a lesson for themselves.
5. **Unauthorized Review**: A random user attempts to leave a review for a tutor they never had a lesson with.
6. **Data Poisoning**: A user attempts to save a 2MB string into a notification message.
7. **State Bypass**: A parent attempts to mark a lesson as `completed` (should be done by tutor or system).
8. **Record Deletion**: A tutor attempts to delete a completed lesson's payment record.
9. **Private Breach**: A parent attempts to read another parent's notifications.
10. **Contract Modification**: A tutor attempts to change the terms of a signed contract.
11. **Email Spoofing**: A user tries to create a profile with a different email than their auth email.
12. **System Override**: A user tries to update the `createdAt` timestamp.

## Test Runner (Draft) - firestore.rules.test.ts
(This file will be used for local testing if environment allows, but I'll focus on generating the rules now.)
