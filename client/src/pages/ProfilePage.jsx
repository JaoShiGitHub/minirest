function ProfilePage() {
  const handleOnClickEditBtn = () => {
    console.log("Edit profile");
  };

  return (
    <section>
      <div>
        <h1>Profile</h1>
        <p>Username: oshinIsSoCutee</p>
        <p>First Name: Shi</p>
        <p>Last Name: JaoShi</p>
        <p>Tel: 0984876577</p>
        <p>Email: oshin.ganjanapas@gmail.com</p>
        <p>Allergy: -</p>
        <p>Birthday: 2001-11-10</p>
      </div>
      <button onClick={handleOnClickEditBtn}>Edit</button>
    </section>
  );
}

export default ProfilePage;
