import { setPostData } from "./set-post-data"

export const loadPostAsync = (serverRequest, postId) => (dispatch) => {
	serverRequest("fetchPost", postId).then((postData) => {
		console.log("setPostData", postData)
		dispatch(setPostData(postData.res))
	})
}