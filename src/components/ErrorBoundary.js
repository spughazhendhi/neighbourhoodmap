import React, { Component } from 'react';

class ErrorBoundary extends Component {
  state = {
    hasError: false
  }

  componentDidCatch(error, info) {
     this.setState({ hasError: true });
   }

   render() {
     if(this.state.hasError) {
       return <h1>Something went wrong.Please try agaoin</h1>;
     }else {
       return this.props.children;
     }
   }
}

export default ErrorBoundary;
