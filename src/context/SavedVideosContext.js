import React from 'react'

const SavedVideosContext = React.createContext({
  savedVideosList: [],
  addSavedVideo: () => {},
  deleteSavedVideo: () => {},
})

export default SavedVideosContext
