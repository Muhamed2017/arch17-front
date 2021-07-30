import styled from "styled-components";

export default styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
  width: 100%;
  background-color: #EAEAEA;
  color: #fff;
  margin: 15px ;
`;

export const Flex = styled.div`
width:350px;
display:grid;
margin:15px 0 0 ;
grid-template-columns: repeat(4, 120px);
justify-content: center;
align-items: center;
grid-column-gap:10px;
font-size:2em;
`;

export const Square = styled.div`
margin:2px ;
justify-content: center;
align-items: center;
font-size:1em;
border:1px solid #666666;
height:80px;
`;
