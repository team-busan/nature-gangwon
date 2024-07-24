const ProfileCard = ({ user_nickname, user_profile }) => {
  return (
    <div className="w-[350px] h-[500px] py-10 rounded-lg bg-random bg-cover flex flex-col items-center justify-between">
      <img className="w-[150px] h-[150px] rounded-full" src={user_profile} />
      <div className="bg-black/75 py-1 px-2 rounded-xl">
        <span className="text-white text-xl">{user_nickname} 님</span>
      </div>
    </div>
  );
};

export default ProfileCard;
