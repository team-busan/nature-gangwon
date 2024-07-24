import Plans from "./Plans";
import Memos from "./Memos";
import ContentList from "../SearchResult/ContentList";
import Photos from "./Photos";

const MyPageContent = ({ contentNum, data, plan, samplePhotos }) => {
  if (contentNum === 0) {
    return <Plans plan={plan} />;
  } else if (contentNum === 1) {
    return <Memos />;
  } else if (contentNum === 2) {
    return <ContentList data={data} />;
  } else if (contentNum === 3) {
    return <Photos samplePhotos={samplePhotos} />;
  } else if (contentNum === 4) {
    return <div>경비분할</div>;
  } else if (contentNum === 5) {
    return <div>정보수정</div>;
  }
};

export default MyPageContent;
