import React,{useEffect, useState} from 'react';
import {Box, Heading, Text, Badge, Button, Center, AlertDialog, Stack, HStack, Input} from "native-base"
import {GrFormAdd} from "react-icons/gr"
import {RiAddLine} from "react-icons/ri"
import db from '../firebase';
import {
    collection,
    addDoc,
    query,
    onSnapshot, 
    deleteDoc, 
    doc,
} from 'firebase/firestore';
import ShowTags from './ShowTags';

function ManageTags() {

    const [newName, setNewName] = useState("");

    const [tags, setTags] = useState([]);
    const tagsCollectionRef = collection(db, "Tag");

    //get Tags
    useEffect(() => {
        const tagsObject = query(collection(db,'Tag'));
        const tagsSnapshot = onSnapshot(tagsObject,(querySnapshot) => {
            let data = [];
            querySnapshot.forEach((doc)=> {
                data.push({...doc.data(),id:doc.id});
            })
            setTags(data);
        });
        return ()=> tagsSnapshot(); 

    }, []);

    const createTag = async () => {
        await addDoc(tagsCollectionRef, { tagName: newName });
    };

    //delete Tag
    const deleteTag = async (id) => {
        const tagDoc = doc(db, 'Tag', id);
        await deleteDoc(tagDoc);
    };

    return (
        
            <Box   mx="2" bg="white" borderRadius="20" shadow={4} >
                <Box m="2">
                    <HStack mt="2" mx="1">
                    <Input w="100%" h="6" onChange={(event) => {
                        setNewName(event.target.value)
                        
                        
                    }}
                    _hover = {{
                        borderColor: '#4f46e5' 
                      }}
                      _invalid={{borderColor: '#4f46e5' }}
                      _focus ={{borderColor: '#4f46e5' }}
                      _disabled ={{borderColor: '#4f46e5' }}
                      borderRightRadius="0" borderLeftRadius="8"
                      placeholder="Create a new tag"
                      
                    />
                    <Button colorScheme="indigo" borderRightRadius="8" borderLeftRadius="0" size="6"  onPress = {createTag}><RiAddLine color="#FFF"/></Button>
                    </HStack>
                    
                        <Box display="flex" flexDirection="row" flexWrap="wrap">
                            {tags.map((tag) => {
                                return (
                                    
                                        <ShowTags tag={tag}></ShowTags>
                                    
                                );
                            })}
                        </Box>
                </Box>
            </Box>
        
        
    )
}

export default ManageTags
