export type PlayerFindWithEmailType = {
  $or: [
    { email: string },
    { phoneNumber: string }    
  ]
}

export type PlayerFindWithIdType = {
  $or: [
    { _id: string },
    { phoneNumber: string }
  ]
}