import React from 'react'
import ReactDOM from 'react-dom'
import { Pane, Tablist, Tab, Paragraph } from 'evergreen-ui'
import About from './components/About'
import Skills from './components/Skills'
import Project from './components/Project'
import Contacts from './components/Contacts'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'
function SidebarTabsExample() {
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const tabs = React.useMemo(() => ['About','Skills','Project','Contacts'], [])

  return (
    <Router>
    <Pane display="flex" height={240}>
      <Tablist marginBottom={16} flexBasis={240} marginRight={24}>
        {tabs.map((tab, index) => {
          return (
            <Tab
              aria-controls={`panel-${tab}`}
              direction="vertical"
              isSelected={index === selectedIndex}
              key={tab}
              onSelect={() => setSelectedIndex(index)}
            >
              {/* {tab} */}
              <Link to={`/${tab.toLowerCase()}`}>{tab}</Link> {/* Use Link to navigate */}
            </Tab>
          )
        })}
      </Tablist>
      <Pane padding={16} background="tint1" flex="1">
        {tabs.map((tab, index) => (
          <Pane
            aria-labelledby={tab}
            aria-hidden={index !== selectedIndex}
            display={index === selectedIndex ? 'block' : 'none'}
            key={tab}
            role="tabpanel"
          >
            {/* if({tab}=='About'){ */}
            {/* let g={tab} */}
            
              <Paragraph><tab/></Paragraph>
            {/* } */}
            <h4>{tab}</h4>
            
            {tab === 'About' && <About />} {/* Render About component when About tab is active */}
            {tab === 'Skills' && <Skills />} {/* Render Traits component when Traits tab is active */}
            {tab === 'Project' && <Project />}
            {tab === 'Contacts' && <Contacts />}
          </Pane>
        ))}
      </Pane>
    </Pane>
    <Routes>
    <Route path="/About" element={About} /> {/* Define a route for Traits */}
    <Route path="/Skills" element={Skills} /> {/* Define a route for Traits */}
    <Route path="/Project" element={Project} />
    <Route path="/Contacts" element={Contacts} />
    {/* <Route path="/traits" component={Traits} /> Define a route for Traits */}
    {/* <Route path="/traits" component={Traits} /> Define a route for Traits */}
    </Routes>
    </Router>
  )
}

ReactDOM.render(
  <SidebarTabsExample />,
  document.getElementById("root")
)