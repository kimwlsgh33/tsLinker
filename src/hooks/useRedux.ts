import {createSlice} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import type {AppDispatch, RootState} from '../store';

// 타입이 지정된 useDispatch, useSelector 만들기
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/*
    useSelector - store의 state에서 특정 정보를 추출하는 훅
    앱이 커졌을때, 동일한 정보를 중복해서 읽어오는 일을 없도록 한다.

    useDispatch - dispatch로 action을 전달하는 훅 
*/
