import { Card, Empty, Icon, List, Typography, Layout, message } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Beer } from './Beer';
import "./style.scss";

const { Title } = Typography;
const { Header, Content, Footer } = Layout;

const Beers = () => {

  const [beers, setBeers] = useState([]);

  useEffect(() => {
    axios.get('/beers')
    .then((response) => {
      setBeers(response.data);
    }).catch((error) => {
      message.error(error.statusText)
    });
  }, []);


  return (
    <Layout>
      <Header className="beers-header">
        <Title className="beers-title" level={1}>Cervezas</Title>
      </Header>
      <Content className="beers-content">
        <List
          grid={{
            gutter: 10,
          }}
          dataSource={beers}
          renderItem={(beer) => (
            <List.Item>
              <Beer {...beer}/>
            </List.Item>
          )}
        />
      </Content>
      <Footer />
    </Layout>
  );
};

export { Beers };
