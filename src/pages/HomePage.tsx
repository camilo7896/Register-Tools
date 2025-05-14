import Home from "../components/home/Home";
import Navbar from "../components/Navbar";

type LoginProps = {
  emailUser: string | null;
};

const HomePage: React.FC<LoginProps> = ({ emailUser }) => {

  

    return (
        <>
        <Navbar Userloged={emailUser} />
          
        <Home/>
        
        </>
    );
}

export default HomePage;