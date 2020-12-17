import React, { Component } from "react";
import { View } from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text,
  ActionSheet,
  Badge,
  Card,
  CardItem,
  Accordion,
  CheckBox,
  ListItem,
  List,
  DatePicker,
  IconNB,
  DeckSwiper,
  Thumbnail,
  Fab
} from "native-base";
import { DatePickerIOS, DatePickerAndroid } from "react-native";
import styles from "./styles";

const datas = [
  {
    route: "SimpleDeck",
    text: "Simple DeckSwiper"
  },
  {
    route: "AdvancedDeck",
    text: "Advanced DeckSwiper"
  }
];

export default class PersonalScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkbox3: true,
      chosenDate: new Date(),
      active: false
    };
    this.setDate = this.setDate.bind(this);
    // this.init();
  }
  async init() {
    // try {
    //   const { action, year, month, day } = await DatePickerAndroid.open({
    //     // 要设置默认值为今天的话，使用`new Date()`即可。
    //     // 下面显示的会是2020年5月25日。月份是从0开始算的。
    //     date: new Date(2020, 4, 25)
    //   });
    //   if (action !== DatePickerAndroid.dismissedAction) {
    //     // 这里开始可以处理用户选好的年月日三个参数：year, month (0-11), day
    //   }
    // } catch ({ code, message }) {
    //   console.warn("Cannot open date picker", message);
    // }
  }
  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }

  toggleSwitch3() {
    this.setState({
      checkbox3: !this.state.checkbox3
    });
  }
  render() {
    return (
      <Content style={{ backgroundColor: "red" }}>
        <Text>insertHtml</Text>
        <Content>
          <Button disabled iconRight>
            <Text>Icon Button</Text>
            <Icon name="home" />
          </Button>

          <ListItem button onPress={() => this.toggleSwitch3()}>
            <CheckBox
              color="green"
              checked={this.state.checkbox3}
              onPress={() => this.toggleSwitch3()}
            />
            <Body>
              <Text>Finish list Screen</Text>
            </Body>
          </ListItem>

          <ListItem>
            <CheckBox checked={false} />
            <Body>
              <Text>Discussion with Client</Text>
            </Body>
          </ListItem>
        </Content>

        <View
          style={{
            backgroundColor: "green"
          }}
        >
          <DatePicker
            defaultDate={new Date(2018, 4, 4)}
            minimumDate={new Date(2018, 1, 1)}
            maximumDate={new Date(2018, 12, 31)}
            locale={"en"}
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={false}
            animationType={"fade"}
            androidMode={"default"}
            placeHolderText="Select date"
            textStyle={{ color: "green" }}
            placeHolderTextStyle={{
              color: "#d3d3d3"
            }}
            onDateChange={this.setDate}
            disabled={false}
          />
          <Text>Date: {this.state.chosenDate.toString().substr(4, 12)}</Text>

          {/* <DatePickerIOS
            date={this.state.chosenDate}
            onDateChange={this.setDate}
          /> */}

          <Content>
            <List
              dataArray={datas}
              renderRow={data => (
                <ListItem button onPress={() => console.log(data)}>
                  <Left>
                    <Text>{data.text}</Text>
                  </Left>
                  <Right>
                    <Icon name="arrow-forward" style={{ color: "#999" }} />
                  </Right>
                </ListItem>
              )}
            />
          </Content>
        </View>

        <View style={{ flex: 1 }}>
          <Fab
            active={this.state.active}
            direction="left"
            containerStyle={{}}
            style={{ backgroundColor: "#5067FF" }}
            position="topRight"
            onPress={() =>
              this.setState({
                active: !this.state.active
              })
            }
          >
            <IconNB name="md-share" />
            <Button
              style={{
                backgroundColor: "#34A34F"
              }}
            >
              <IconNB name="logo-whatsapp" />
            </Button>
            <Button
              style={{
                backgroundColor: "#3B5998"
              }}
            >
              <IconNB name="logo-facebook" />
            </Button>
            <Button
              disabled
              style={{
                backgroundColor: "#DD5144"
              }}
            >
              <IconNB name="ios-mail" />
            </Button>
            <Button
              style={{
                backgroundColor: "#3B5998"
              }}
            >
              <IconNB name={"ios-heart"} style={{ color: "#ED4A6A" }} />
            </Button>
          </Fab>
        </View>
      </Content>
    );
  }
}
