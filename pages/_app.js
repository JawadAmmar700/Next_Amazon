import "../styles/globals.css"
import store from "../redux/app/store"
import { Provider } from "react-redux"
import { Provider as AuthProvider } from "next-auth/client"
import Layout from "../components/Layout"

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider session={pageProps.session}>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </AuthProvider>
  )
}

export default MyApp
