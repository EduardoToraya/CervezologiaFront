import { List, Layout, message } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Beer } from './Beer';
import "./style.scss";
import { Filters } from './Filters';

const { Content, Footer } = Layout;

const Beers = () => {

  const [beers, setBeers] = useState([]);
  const [filter, setFilter] = useState({});

  useEffect(() => {
    axios.get('/beers', {
      params: {
        origin: filter.origin,
        brewery: filter.brewery,
        style: filter.style
      }
    })
    .then((response) => {
      setBeers(response.data);
    }).catch((error) => {
      message.error(error.statusText)
    });
  }, [filter]);

  return (
    <div className="site-drawer-render-in-current-wrapper">
      <Layout>
        <Filters onSearch={setFilter}/>
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
    </div>
  );
};

export { Beers };
