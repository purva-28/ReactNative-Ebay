import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet} from 'react-native';
import Input from './input';
import Dropdown from './dropdown';
import Checkbox from './checkbox';
import CustomButton from './button';
import Card from './card';

const Form = () => {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('All Categories');
  const [condition, setCondition] = useState({
    new: false,
    used: false,
    unspecified: false,
  });
  const [shippingOptions, setShippingOptions] = useState({
    localPickup: false,
    freeShipping: false,
  });
  const [cards, setCards] = useState([]);

  const handleConditionChange = (conditionType) => {
    setCondition({ ...condition, [conditionType]: !condition[conditionType] });
  };

  const handleShippingOptionChange = (optionType) => {
    setShippingOptions({ ...shippingOptions, [optionType]: !shippingOptions[optionType] });
  };

  const handleSubmit = async () => {

    const formDataCollected = {
        keyword,
        category,
        condition,
        shippingOptions,
    };
    console.log(formDataCollected);

    // ======> API CALL HERE
    const params = {
        Keyword: keyword,
        Category: category,
        new: condition.new,
        used: condition.used,
        unspecified: condition.unspecified,
        freeShipping: shippingOptions.freeShipping,
        localPickup: shippingOptions.localPickup,
        distance: 10,
        buyerPostalCode: 90007,
      };

      const apiUrl = 'https://inductive-folio-404523.wl.r.appspot.com/getallitems';
      

      const requestOptions = { 
        method: 'POST', 
        mode:'cors',
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(params) 
    }; 

    try {
        const response = await fetch(apiUrl, requestOptions);
      
        if (response.ok) {
          const data = await response.json();
          console.log('API response:', data['findItemsAdvancedResponse'][0]['searchResult']);
          const data_count = data['findItemsAdvancedResponse'][0]['searchResult'][0]["@count"]
          const data_item = data['findItemsAdvancedResponse'][0]['searchResult'][0]["item"]
          console.log("Data count:",data_count)
        //   console.log(data_item[0]['title'][0])
        //   console.log(data_item[0]['galleryURL'][0])
        //   console.log(data_item[0]['sellingStatus'][0]['currentPrice'][0]['__value__'])
        //   console.log(data_item[0]['storeInfo'][0]['storeName'][0])

          var card_data = []
          for(let i = 0; i < data_count; i++){
            card_data.push({
                title:data_item[i]['title']?data_item[i]['title'][0]:"Dummy",
                imageSource:data_item[i]['galleryURL']?data_item[i]['galleryURL'][0]:"Dummy",
                price:data_item[i]['sellingStatus']?data_item[i]['sellingStatus'][0]['currentPrice'][0]['__value__']:"dummy",
                store:data_item[i]['storeInfo']?data_item[i]['storeInfo'][0]['storeName'][0]:"Dummy",
            })
          }
        //   console.log(card_data)
          setCards(card_data);
        } else {
          console.error('API request failed:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('API request failed:', error.message);
      }



    // dummy card data
    // const dummyCardData = {
    //     imageSource: 'https://via.placeholder.com/150',
    //     title: 'Dummy Item',
    //     price: '19.99',
    //     store: 'This is a dummy item for testing purposes.',
    //   };
  
    //   setCards([dummyCardData, dummyCardData, dummyCardData]);


  };

  const handleClear = () => {
    setKeyword('');
    setCategory('All Categories');
    setCondition({ new: false, used: false, unspecified: false });
    setShippingOptions({ localPickup: false, freeShipping: false });
    setCards([]);
  };

  return (
    <ScrollView style={styles.form}>
      {/* Row 1 */}
      <Text style={{fontWeight:'bold',fontSize:20}}>Keyword</Text>
      <Input value={keyword} onChangeText={setKeyword}/>

      {/* Row 2 */}
      <Text style={{fontWeight:'bold',fontSize:20}}>Category</Text>
      <Dropdown
        // label="Category"
        selectedValue={category}
        onValueChange={(value) => setCategory(value)}
        items={[
          'All Categories',
          'Art',
          'Baby',
          'Books',
          'Clothing, Shoes & Accessories',
          'Computers/Tablets & Networking',
          'Health & Beauty',
          'Music',
          'Video Games & Consoles',
        ]}
      />

      {/* Row 3 */}
      <View style={{ marginBottom: 15 }}>
        <Text style={{fontWeight:'bold',fontSize:20}}>Condition</Text>
      </View>

      {/* Row 4 */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>
        <Checkbox label="New" checked={condition.new} onValueChange={() => handleConditionChange('new')} />
        <Checkbox label="Used" checked={condition.used} onValueChange={() => handleConditionChange('used')} />
        <Checkbox label="Unspecified" checked={condition.unspecified} onValueChange={() => handleConditionChange('unspecified')} />
      </View>

      {/* Row 5 */}
      <View style={{ marginBottom: 15 }}>
        <Text style={{fontWeight:'bold',fontSize:20}}>Shipping</Text>
      </View>

      {/* Row 6 */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>
        <Checkbox label="Local Pickup" checked={shippingOptions.localPickup} onValueChange={() => handleShippingOptionChange('localPickup')} />
        <Checkbox label="Free Shipping" checked={shippingOptions.freeShipping} onValueChange={() => handleShippingOptionChange('freeShipping')} />
      </View>

      {/* Row 7 */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>
        <CustomButton title="Submit" onPress={handleSubmit} />
        <CustomButton title="Clear" onPress={handleClear} />
      </View>

      {/* Render cards dynamically */}
      {cards.map((card, index) => (
        <Card key={index} {...card} />
      ))}

    </ScrollView>
  );
};

const styles = StyleSheet.create({
    form: {
      padding: 10,
      width: '90%',
      alignSelf: 'center',
    },

  });

export default Form;
