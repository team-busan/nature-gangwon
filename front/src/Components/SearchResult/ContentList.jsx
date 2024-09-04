import { useRecoilState } from "recoil";
import Content from "./Content.jsx";
import {
  searchResultListState,
  searchResultPageState,
} from "../../state/searchResultState.js";
import ReactPaginate from "react-paginate";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const ContentList = ({ data, refetch }) => {
  const [list, setList] = useRecoilState(searchResultListState);
  const [page, setPage] = useRecoilState(searchResultPageState);

  const handlePageClick = async (event) => {
    const selectedPage = event.selected + 1;
    if (selectedPage !== page) {
      await setPage(selectedPage);
      refetch();
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <ul className="flex flex-col gap-8">
        {list?.map((content, idx) => (
          <Content key={idx} content={content} />
        ))}
      </ul>
      <div className="w-full flex justify-center">
        <ReactPaginate
          previousLabel={<FaAngleLeft />}
          nextLabel={<FaAngleRight />}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={data.totalPage}
          marginPagesDisplayed={0}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName="flex items-center w-60 justify-between"
          subContainerClassName={""}
          pageClassName="text-xl w-5 text-center"
          activeClassName="text-green font-bold"
          previousClassName="previous"
          nextClassName="next"
          disabledClassName="disabled"
          forcePage={page - 1}
        />
      </div>
    </div>
  );
};

export default ContentList;
