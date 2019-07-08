import React from 'react';
import {
  Avatar,
  BackgroundImage,
  BackgroundImageSrc,
  Brand,
  Button,
  Bullseye,
  ButtonVariant,
  Card,
  CardBody,
  CardHeader,
  DataList,
  DataListCell,
  DataListContent,
  DataListItemRow,
  DataListItem,
  DataListItemCells,
  DataListToggle,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownSeparator,
  Gallery,
  GalleryItem,
  Grid,
  GridItem,
  KebabToggle,
  Nav,
  NavItem,
  NavList,
  NavVariants,
  Page,
  Pagination,
  PaginationVariant,
  PageHeader,
  PageSection,
  PageSectionVariants,
  PageSidebar,
  TextContent,
  Text,
  Toolbar,
  ToolbarGroup,
  ToolbarItem,
} from '@patternfly/react-core';
// make sure you've installed @patternfly/patternfly
import accessibleStyles from '@patternfly/patternfly/utilities/Accessibility/accessibility.css';
import spacingStyles from '@patternfly/patternfly/utilities/Spacing/spacing.css';
import { css } from '@patternfly/react-styles';
import { Table, TableHeader, TableBody, TableVariant, sortable, SortByDirection, expandable, cellWidth, headerCol } from '@patternfly/react-table';
import axios from 'axios';
import Highcharts from 'highcharts';
import {
  HighchartsChart, withHighcharts, Title, XAxis, YAxis, TreemapSeries, Legend, Tooltip
} from 'react-jsx-highcharts';
import addTreemapModule from 'highcharts/modules/treemap';
import addHeatmapModule from 'highcharts/modules/heatmap';
//import brandImg from './l_pf-reverse-164x11.png';
//import avatarImg from './img_avatar.svg';

import xs from '@assets/images/pfbg_576.jpg';
import xs2x from '@assets/images/pfbg_576@2x.jpg';
import sm from '@assets/images/pfbg_768.jpg';
import sm2x from '@assets/images/pfbg_768@2x.jpg';
import lg from '@assets/images/pfbg_2000.jpg';
import filter from '@assets/images/background-filter.svg';

const cStyle={ 
  textAlign: 'center'
};

const divStyle = {
  width: 1400,
  height: 800
};

const colorAxis = {
  minColor: '#FFFFFF',
  maxColor: Highcharts.getOptions().colors[0]
};

addTreemapModule(Highcharts);
addHeatmapModule(Highcharts);

class Home extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        expanded: [],
        treemapdata: [],
      columns: ['Word','Count'],
      rows: [],
      sortBy: {},
        isOpen0: false,
        isOpen1: false,
        isOpen2: false,
        isOpen3: false,
        page: 1,
        perPage: 20
      };
    }

    componentDidMount() {
      var mapdata = []
      axios.get(`http://quarkus-words-api-grafzahl1.apps.cluster-datacbr-c04a.datacbr-c04a.openshiftworkshop.com/api/v1/words`)
        .then(res => {
          this.setState({ treemapdata: res.data });
          var datarows = [];
          res.data.map((item) => {
            console.log("item name: "+item.name);
            console.log("item value: "+item.value);
            datarows.push([item.name, item.value]);
          })
          this.setState({ rows: datarows });
       })
    };

    onToggle0 = isOpen0 => {
        this.setState({ isOpen0 });
      };

    onToggle1 = isOpen1 => {
      this.setState({ isOpen1 });
    };

    onToggle2 = isOpen2 => {
      this.setState({ isOpen2 });
    };

    onToggle3 = isOpen3 => {
      this.setState({ isOpen3 });
    };

    onSelect0 = event => {
      this.setState(prevState => ({
        isOpen0: !prevState.isOpen0
      }));
    };

    onSelect1 = event => {
      this.setState(prevState => ({
        isOpen1: !prevState.isOpen1
      }));
    };

    onSelect2 = event => {
      this.setState(prevState => ({
        isOpen2: !prevState.isOpen2
      }));
    };

    onSelect3 = event => {
      this.setState(prevState => ({
        isOpen3: !prevState.isOpen3
      }));
    };

    onSetPage = (_event, pageNumber) => {
      this.setState({
        page: pageNumber
      });
    };

    onPerPageSelect = (_event, perPage) => {
      this.setState({
        perPage
      });
    };

  onSort(_event, index, direction) {
    const sortedRows = this.state.rows.sort((a, b) => (a[index] < b[index] ? -1 : a[index] > b[index] ? 1 : 0));
    this.setState({
      sortBy: {
        index,
        direction
      },
      rows: direction === SortByDirection.asc ? sortedRows : sortedRows.reverse()
    });
  }

    
    render() {
      const toggle = id => {
      const expanded = this.state.expanded;
      const index = expanded.indexOf(id);
      const newExpanded =
        index >= 0 ? [...expanded.slice(0, index), ...expanded.slice(index + 1, expanded.length)] : [...expanded, id];
      this.setState(() => ({ expanded: newExpanded }));
      
    };
    return (
      <React.Fragment>
          <PageSection>
              <HighchartsChart colorAxis={colorAxis}>
                <Title>Word count data</Title>

                <Legend />
                <Tooltip padding={10} hideDelay={250} shape="square" split />
                <XAxis />
                <YAxis>
                  <TreemapSeries name="Word counts" data={this.state.treemapdata} layoutAlgorithm="squarified" />
                </YAxis>
              </HighchartsChart>
          </PageSection>
          <PageSection>
            <div>
            <p>This is a treemap looking at the top 10 words produced from a microservices architecture based on Apache Spark
              and OpenShift.</p>
            <br />
            <p>The microservices architecture consists of a 'word fountain' that continuously adds randomly generated words to a 
              Kafka topic. An Apache Spark workflow then reads words from the topic, calculates the top k-words in a given time 
              period, and exposes this via a Flask app, Graf Zahl.</p>
            <br />
            <p>Once data is available via the Graf Zahl RESTful API, we need to transform it before it can be used by this React interface. 
              We've deployed a Quarkus app that takes data from the Graf Zahl RESTful API, transforms it to the format required by our 
              treemap, and also makes the data available from the RESTful API.</p>
            <br />
            <p>You're actually looking at this data in a PatternFly React app. The app uses the Axios library to collect the data 
              from the Quarkus API and present it in a ReactJSXHighcharts Treemap, presented within a PatternFly interface.</p>
            </div>
            </PageSection>
      </React.Fragment>
    );
  }
}
export default withHighcharts(Home, Highcharts);
