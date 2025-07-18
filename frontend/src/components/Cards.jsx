function ProfileCard(props) {
  return (
    <section className="bg-[#FDFDFA] flex justify-between items-center w-full min-w-[930px] rounded-2xl shadow-2xl mt-20">
      {props.children}
    </section>
  );
}

export { ProfileCard };
