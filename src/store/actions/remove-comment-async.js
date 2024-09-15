import { setPostData } from "./set-post-data"

export const removeCommentAsync = (serverRequest, postId, id) => (dispatch) => {
	serverRequest("removePostComment", postId, id).then((postData) => {
		dispatch(setPostData(postData.res))
	})
}