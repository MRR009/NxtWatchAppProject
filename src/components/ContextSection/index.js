import {AiFillHome} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {CgPlayListAdd} from 'react-icons/cg'

import './index.css'

const ContextSection = () => (
  <div className="context-section-container">
    <div className="context-name-container active-tab">
      <AiFillHome className="context-icons active-icon" />
      <p className="context-name">Home</p>
    </div>
    <div className="context-name-container ">
      <HiFire className="context-icons " />
      <p className="context-name">Trending</p>
    </div>
    <div className="context-name-container ">
      <SiYoutubegaming className="context-icons " />
      <p className="context-name">Gaming</p>
    </div>
    <div className="context-name-container ">
      <CgPlayListAdd className="context-icons " />
      <p className="context-name">Saved videos</p>
    </div>
  </div>
)

export default ContextSection
