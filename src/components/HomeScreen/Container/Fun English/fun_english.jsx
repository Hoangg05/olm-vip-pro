import React from "react";
import {
	Answer,
	Avatar,
	Card,
	List,
	Post,
	Quest,
	Question,
	Username
} from "../../../customs/container.styled";
import logo from "../../../images/logo/logo.png";

function FunEnglishComponent(props) {
	return (
		<Card color="pink">
			<a href="/fun/english">
				<h4>Fun English !</h4>
			</a>
			<List>
				<Post hasImageQuestion>
					<Avatar hasImageQuestion p={20}>
						<img src={props.photoURL || logo} alt="" />
					</Avatar>
					<Question>
						<Username>Hoàng</Username>
						<Quest>
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Soluta pariatur repellendus deleniti eos, fuga
							impedit distinctio. Odit dignissimos commodi ratione
							nisi aperiam omnis at incidunt doloremque impedit.
							Saepe, natus voluptates.
						</Quest>
						<Quest>
							<img src={logo} alt="" />
						</Quest>
						<Answer>41 câu trả lời</Answer>
					</Question>
				</Post>
				<Post>
					<Avatar>
						<img
							src={props.photoURL ? props.photoURL : logo}
							alt=""
						/>
					</Avatar>
					<Question>
						<Username>Hoàng</Username>
						<Quest>
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Soluta pariatur repellendus deleniti eos, fuga
							impedit distinctio. Odit dignissimos commodi ratione
							nisi aperiam omnis at incidunt doloremque impedit.
							Saepe, natus voluptates.
						</Quest>
						<Answer>41 câu trả lời</Answer>
					</Question>
				</Post>
				<Post>
					<Avatar>
						<img src={props.photoURL || logo} alt="" />
					</Avatar>
					<Question>
						<Username>Hoàng</Username>
						<Quest>
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Soluta pariatur repellendus deleniti eos, fuga
							impedit distinctio. Odit dignissimos commodi ratione
							nisi aperiam omnis at incidunt doloremque impedit.
							Saepe, natus voluptates.
						</Quest>
						<Answer>41 câu trả lời</Answer>
					</Question>
				</Post>
				<Post>
					<Avatar>
						<img src={props.photoURL || logo} alt="" />
					</Avatar>
					<Question>
						<Username>Hoàng</Username>
						<Quest>
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Soluta pariatur repellendus deleniti eos, fuga
							impedit distinctio. Odit dignissimos commodi ratione
							nisi aperiam omnis at incidunt doloremque impedit.
							Saepe, natus voluptates.
						</Quest>
						<Answer>41 câu trả lời</Answer>
					</Question>
				</Post>
			</List>
		</Card>
	);
}

export default FunEnglishComponent;
