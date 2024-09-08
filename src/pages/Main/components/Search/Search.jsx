import styled from "styled-components"
import { Icon, Input } from "../../../../components"

const SearchContainer = ({ className, searchPhrase, onChange }) => {
	return (
		<div className={className}>
			<Input value={searchPhrase} placeholder="Поиск по заголовку" onChange={onChange}/>
			<Icon id="fa-search" inactive="true" size="21px"/>
		</div>
	)
}

export const Search = styled(SearchContainer)`
	display: flex;
	position: relative;
	align-items: center;
	width: 340px;
	height: 40px;
	margin: 40px auto 20px;
	z-index: 11;

	& > input {
		padding: 10px 32px 10px 10px;
	}

	& > button {
		position: absolute;
		right: 10px;
		top: 8px;
	}
`