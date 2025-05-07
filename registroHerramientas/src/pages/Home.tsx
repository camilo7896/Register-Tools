import Navbar from "../components/Navbar";

type LoginProps = {
  emailUser: string | null;
};

const Home: React.FC<LoginProps> = ({ emailUser }) => {

  

    return (
        <>
        <Navbar Userloged={emailUser} />
        
      
        
        </>
    );
}

export default Home;