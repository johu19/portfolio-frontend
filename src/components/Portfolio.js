import React from 'react';
import { fetchPortfolio, updatePortfolio } from '../gateways/backendGateway';
import { Input, Row, Col, Button, DatePicker, Image, notification } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import moment from 'moment';
const { TextArea } = Input;

class Portfolio extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    this.state = {
      timeline: [],
      loading: false,
    };
    this.fetchPortfolio = this.fetchPortfolio.bind(this);
    this.updatePortfolio = this.updatePortfolio.bind(this);
  }

  async fetchPortfolio() {
    this.setState({ loading: true });
    const portfolio = await fetchPortfolio();
    const { portfolioName, description, birthdate, twitterUsername, timeline } = portfolio;
    this.setState({ portfolioName, description, birthdate, twitterUsername, timeline });
    this.setState({ loading: false });
  }

  async updatePortfolio() {
    this.setState({ loading: true });
    const { portfolioName, description, birthdate, twitterUsername } = this.state;
    const result = await updatePortfolio(portfolioName, description, twitterUsername, birthdate);
    if (result) {
      notification.success({ message: 'Portfolio updated', duration: 10 });
    } else {
      notification.error({ message: 'Failed updating portfolio', duration: 10 });
    }
    this.fetchPortfolio();
    this.setState({ loading: false });
  }

  async componentDidMount() {
    await this.fetchPortfolio();
  }

  render() {
    return (
      <div style={{ marginLeft: '25%', marginRight: '25%', textAlign: 'center', marginTop: '5%', fontFamily: 'Arial, Helvetica, sans-serif' }}>
        <div>
          <h1>PORTFOLIO</h1>
          {this.state.loading && <LoadingOutlined />}
          <br />
          {!this.state.loading && <Image src={this.state.timeline ? this.state.timeline[0]?.user.profile_image_url : undefined} />}
          <br />
          <br />
          <Row gutter={24}>
            <Col span={8}>
              <h3>Full Name</h3>
            </Col>
            <Col span={12}>
              <Input value={this.state.portfolioName} onChange={(event) => this.setState({ portfolioName: event.target.value })} />
            </Col>
          </Row>
          <br />
          <Row gutter={24}>
            <Col span={8}>
              <h3>Twitter Username</h3>
            </Col>
            <Col span={12}>
              <Input value={this.state.twitterUsername} onChange={(event) => this.setState({ twitterUsername: event.target.value })} />
            </Col>
          </Row>
          <br />
          <Row gutter={24}>
            <Col span={8}>
              <h3>Birthdate</h3>
            </Col>
            <Col span={12}>
              <DatePicker
                allowClear={false}
                style={{ width: '100%' }}
                onChange={(date) => this.setState({ birthdate: moment(date).startOf('day') })}
                format="YYYY-MM-DD"
                value={moment(this.state.birthdate)}
              />
            </Col>
          </Row>
          <br />
          <Row gutter={24}>
            <Col span={8}>
              <h3>Portfolio Description</h3>
            </Col>
            <Col span={12}>
              <TextArea rows={3} value={this.state.description} onChange={(event) => this.setState({ description: event.target.value })} />
            </Col>
          </Row>
        </div>
        <br />
        <h2>Timeline</h2>
        <div>
          {!this.state.loading && this.state.timeline.map((t, index) => (
            <div style={{ fontSize: '80%' }} key={t.id}>{`${index}: ${t.text}`}</div>
          ))}
        </div>
        <br />
        <Button
          disabled={!this.state.portfolioName || !this.state.description || !this.state.twitterUsername || !this.state.birthdate}
          loading={this.state.loading}
          type="primary"
          onClick={() => this.updatePortfolio()}
        >
          Update
        </Button>
      </div>
    );
  }
}

export default Portfolio;
