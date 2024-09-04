import { setPostData } from "./set-post-data"

export const removePostAsync = (serverRequest, id) => () => serverRequest("removePost", id)