export interface ProjectMapPinProps {
  /** Category of the project */
  category: string;
  // VERIFICATION PROJECTS: HIDDEN
  // /** Whether the project is verified */
  // trusted: boolean;
  /** Whether the marker can be interacted with. Default to `true`. */
  interactive?: boolean;
}
