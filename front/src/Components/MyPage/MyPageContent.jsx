import Plans from "./Plans";
import Memos from "./Memos";
import ContentList from "../SearchResult/ContentList";
import Photos from "./Photos";
import ExpensesDivision from "./ExpensesDivision";
import EditProfile from "./EditProfile";

const MyPageContent = ({ contentNum, data, plan, samplePhotos }) => {
  if (contentNum === 0) {
    // return <Plans plan={plan} />;
  } else if (contentNum === 1) {
    // return <Memos />;
  } else if (contentNum === 2) {
    // return <ContentList data={data} />;
  } else if (contentNum === 3) {
    // return <Photos samplePhotos={samplePhotos} />;
  } else if (contentNum === 4) {
    return <ExpensesDivision />;
  } else if (contentNum === 5) {
    return <EditProfile />;
  }
};

export default MyPageContent;
