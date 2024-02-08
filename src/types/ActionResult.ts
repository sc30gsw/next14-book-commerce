export type ActionsResult = Readonly<
  | {
      isSuccess: true
      message: string
    }
  | {
      isSuccess: false
      error: {
        message: string
      }
    }
>
