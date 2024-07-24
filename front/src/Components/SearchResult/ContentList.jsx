import Content from "./Content.jsx";

const ContentList = ({ data }) => {
  return (
    <ul className="flex flex-col gap-8">
      {data?.map((content, idx) => (
        <Content key={idx} content={content} />
      ))}
    </ul>
  );
};

export default ContentList;
