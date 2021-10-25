import rulesImg from "../../assets/images/image-rules.svg";
import { Link } from "react-router-dom";

function Home() {
	return (
		<div className="Home container-column">
			<div>
				<h2>RULES</h2>
			</div>
			<ol className="rule-list">
				<li>- There will be 5 turns.</li>
				<li>
					- If you win a turn then your score will increased by 5. And if you
					lose a turn it will decreased by 3.
				</li>
				<li>
					- Winning criteria is as follows - <br />
					<img src={rulesImg} alt="rules" className="rules" />
				</li>
				<li>
					- Once you select your choice for the turn then you can not change it.
				</li>
			</ol>
			<Link className="btn btn-primary" to="/game">
				Start Game
			</Link>
		</div>
	);
}

export default Home;
