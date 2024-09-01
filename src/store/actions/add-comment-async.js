import { setPostData } from "./set-post-data"

export const addCommentAsync = (serverRequest, userId, postId, content) => (dispatch) => {
	serverRequest("addPostComment", userId, postId, content).then((postData) => {
		dispatch(setPostData(postData.res))
	})
}