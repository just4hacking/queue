//don't change ActionStatus as it's binded to database difinitons
export enum ActionStatus {
  WithAction = 'with_action',
  WithoutAction = 'without_action',
  InProgress = 'in_progress',
  Done = 'done'
}