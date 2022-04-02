import React from 'react'
import { getCategoryApiMethod } from './graphql-data/sendRequest'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      category: null,
      error: null
    }
  }

  async componentDidMount() {
    try {
      const category = await getCategoryApiMethod();
      this.setState({ category: category })
    } catch (err) {
      this.setState({ error: err.message || err.toString() });
      console.log(err)
    }
  }

  render() {
    const { category } = this.state;
    let displayName = null;
    if (category) {
      displayName = category['category']['name']
    }
    return (
      <>
        <div>Able to fetch category data {displayName}</div>
      </>
    )
  }
}




export default App;
