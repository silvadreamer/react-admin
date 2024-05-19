import React from "react";
import { WarningOutlined } from "@ant-design/icons";
import "./index.less";

export default class ErrorBoundary extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location !== this.props.location) {
      this.setState({
        hasError: false,
      });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <WarningOutlined className="error-icon" />
          <div>加载出错,请刷新页面</div>
        </div>
      );
    }
    return this.props.children;
  }
}
