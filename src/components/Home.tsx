import { Sorting } from "../Sorting";
import { Feed } from "./Feed";
import { Title } from "./feed/Title";

interface IProps {
  sorting: Sorting;
}

const Home = ({ sorting }: IProps) => (
  <>
    <Title title={sorting} />
    <Feed urlFunc={`/.netlify/functions/projects?sorting=${sorting}`} />
  </>
);

export { Home };
