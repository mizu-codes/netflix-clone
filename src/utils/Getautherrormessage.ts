import { FirebaseError } from "firebase/app";

// Maps common Firebase Auth error codes to user-friendly copy.
// Any code not listed here falls back to Firebase's own error.message,
// so behavior for unmapped codes is unchanged from before.
const FRIENDLY_MESSAGES: Record<string, string> = {
  "auth/invalid-credential": "Incorrect email or password.",
  "auth/wrong-password": "Incorrect email or password.",
  "auth/user-not-found": "Incorrect email or password.",
  "auth/invalid-email": "Please enter a valid email address.",
  "auth/email-already-in-use": "An account with this email already exists.",
  "auth/weak-password": "Password should be at least 6 characters.",
  "auth/too-many-requests": "Too many attempts. Please try again later.",
  "auth/network-request-failed":
    "Network error. Check your connection and try again.",
};

export function getAuthErrorMessage(error: unknown): string {
  if (error instanceof FirebaseError) {
    return FRIENDLY_MESSAGES[error.code] ?? error.message;
  }

  return "Something went wrong";
}