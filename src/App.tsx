import { routes } from "~/modules"
import { Switch, BrowserRouter as Router, Route } from "react-router-dom"
import { DataContextProvider } from "./context/data"
import { ModalProvider } from "./context/modals"
import { PaginationProvider } from "./context/pagination"

const App = () => {
  return (
    <Router>
      <Switch>
        <DataContextProvider>
          <ModalProvider>
            <PaginationProvider>
              {routes.map((routeConfig, index) => (
                <Route
                  {...routeConfig}
                  key={index}
                  render={() => (
                    <routeConfig.element
                      title={routeConfig.title}
                      name={routeConfig.name}
                    />
                  )}
                />
              ))}
            </PaginationProvider>
          </ModalProvider>
        </DataContextProvider>
      </Switch>
    </Router>
  )
}

export default App
