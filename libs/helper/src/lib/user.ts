export const userIsOwner = (userId: string, obj: { user: { id: string } }): boolean => obj.user.id === userId;
