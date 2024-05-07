export class RoutePath {
  static HOME = '/';
  static LOGIN = '/login';
  static SIGNUP = '/sign-up';
}

export class ValidationError {
  static REQUIRED = 'This field is required';
  static INVALID_EMAIL = 'Invalid email address';
  static PASSWORD_MIN_LENGTH = 'Password must have at least 8 characters';
  static PASSWORD_MISMATCH = 'Passwords do not match';
}

export class AuthStatus {
  static SIGNUP_SUCCESS = 'Signed up successfully';
  static LOGIN_SUCCESS = 'Logged in successfully';
  static EMAIL_PASSWORD_INCORRECT = 'Email or password is incorrect';
  static EMAIL_EXISTS = 'Email already exists';
  static INVALID_CREDENTIALS = 'Invalid credentials';
}
