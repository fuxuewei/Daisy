import React from 'react';

const Home: React.FC = () => {
    interface Person{
        name:string | null;
    }
    
    const Greeter = (person: Person) =>{
        return "Hello, " +person.name + "!";
    }
    
    let user = {name: localStorage.getItem("name")};
    return (
      <div className="userMsg">
        {Greeter(user)}
      </div>
    );
}

export default Home;