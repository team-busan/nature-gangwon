import Plans from "./Plans";
import Memos from "./Memos";
import MyPhotos from "./MyPhotos";
import ExpensesDivision from "./ExpensesDivision";
import EditProfile from "./EditProfile";
import MarkedContents from "./MarkedContents";

const MyPageContent = ({ contentNum }) => {
  if (contentNum === 0) {
    return <Plans />;
  } else if (contentNum === 1) {
    return <Memos />;
  } else if (contentNum === 2) {
    return <MarkedContents />;
  } else if (contentNum === 3) {
    return <MyPhotos />;
  } else if (contentNum === 4) {
    return <ExpensesDivision />;
  } else if (contentNum === 5) {
    return <EditProfile />;
  }
};

export default MyPageContent;
