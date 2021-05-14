import React from 'react';
import { useStateValue } from '../StateProvider';
import './SearchPage.css';
import useGoogleSearch from './useGoogleSearch';
import Response from '../response';
import { Link } from "react-router-dom";
import Search from '../components/Search';
import SearchIcon from '@material-ui/icons/Search';
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import OndemandVideoOutlinedIcon from "@material-ui/icons/OndemandVideoOutlined";
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined";
import MoreVertIcon from '@material-ui/icons/MoreVert';


function SearchPage() {
    
    const [{ term }, dispatch] = useStateValue();
    const { data } = useGoogleSearch(term); // LIVE API CALL

    // Mock API CALL
    // const data = Response;

    console.log(data)

    return (
      <div className="searchPage">
        <div className="searchPage__header">
          <Link to="/">
            <img
              className="searchPage__log"
              src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
              alt=""
              width="100"
            />
          </Link>

          <div className="searchPage__headerBody">
            <Search hideButtons />

            <div className="searchPage__options">
              <div className="searchPage__optionsLeft">
                <div className="searchPage__option">
                  <SearchIcon />
                  <Link to="/all">All</Link>
                </div>
                <div className="searchPage__option">
                  <OndemandVideoOutlinedIcon />
                  <Link to="/videos">Videos</Link>
                </div>
                <div className="searchPage__option">
                  <ImageOutlinedIcon />
                  <Link to="/images">Images</Link>
                </div>
                <div className="searchPage__option">
                  <DescriptionOutlinedIcon />
                  <Link to="/news">News</Link>
                </div>
                <div className="searchPage__option">
                  <RoomOutlinedIcon />
                  <Link to="/map">Maps</Link>
                </div>
                <div className="searchPage__option">
                  <MoreVertIcon />
                  <Link to="/more">More</Link>
                </div>
              </div>
              <div className="searchPage__optionsRight">
                <div className="searchPage__option">
                  <Link to="/settings">Settings</Link>
                </div>
                <div className="searchPage__option">
                  <Link to="/tools">Tools</Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {term && (
          <div className="searchPage__results">
            <p className="searchPage__resultCount">
              About {data?.searchInformation.formattedTotalResults} results (
              {data?.searchInformation.formattedSearchTime} seconds)
            </p>
            {data?.items.map((item) => (
              <div className="searchPage__result">
                <a className="searchPage__resultLink" href={item.link}>
                  {item?.pagemap?.cse_image?.length > 0 &&
                    item.pagemap?.cse_image[0]?.src && (
                      <img
                        className="searchPage__resultImage"
                        src={
                          item.pagemap?.cse_image?.length > 0 &&
                          item.pagemap?.cse_image[0]?.src
                        }
                        alt=""
                      />
                    )}
                  {item.displayLink}▾
                </a>
                <a className="searchPage__resultTitle" href={item.link}>
                  <h2>{item.title}</h2>
                </a>
                <p className="searchPage__resultSnippet">{item.snippet}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
}

export default SearchPage
