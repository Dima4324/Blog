export const sanitizeContent = (content) => content
	.replaceAll("&nbsp;", "\n")
	.replace(/ +/, " ")
	.replaceAll("<div><br></div>", "\n")
	.replaceAll("<br>", "\n")
	.replaceAll("<div>", "\n")
	.replaceAll("</div>", "")