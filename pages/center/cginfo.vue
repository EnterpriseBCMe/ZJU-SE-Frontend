<template>
	<view class="content">
		<image class="logo" src="/static/center/portrate.png"></image>
 		<view class="text-area">
			<text class="title">{{title}}</text>
		</view> 
		<view class="text-area">
			<text class="title">{{phone}}</text>
		</view> 
		<section>
			<input class="uni-input"  placeholder="用户名" v-model="userName"></input>
		</section>
		<section>
			<input class="uni-input"  placeholder="邮箱" v-model="userEmail"></input>
		</section>
		<section>
			<input class="uni-input"  placeholder="年龄" v-model="userAge"></input>
		</section>
		<section>
			<select v-model="selected"  style="width:200px;height:40px;" defaultValue="">
			  <option value="" disabled selected hidden>性别</option>
			  <option v-for="option in options" v-bind:value="option.value">
				{{ option.text }}
			  </option>
			</select>
		</section>
	
		<section>
			<input class="uni-input"  placeholder="身高" v-model="userHeight"></input>
		</section>
		<section>
			<input class="uni-input"  placeholder="体重" v-model="userWeight"></input>
		</section>
		<section>
			<input class="uni-input"  placeholder="身份证" v-model="userIDNumber"></input>
		</section>
		<section>
			<input class="uni-input"  placeholder="社保卡" v-model="socialInsureNum"></input>
		</section>
		<section>
			<button type="button" @click="onchinfo">修改</button>
		</section>
	</view>
</template>

<script>
	import {putchinfo, getUserInfo} from "../../fetch/api.js";
	import {
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				title:'WELCOME',
				phone: '',
				userName: '',
			    userEmail: '',
				userGender: '',
				userHeight: '',
				userWeight: '',
				userAge: '',
				userIDNumber: '',
				socialInsureNum: '',
				selected: '',
				options: [
				      { text: '男', value: 'male' },
				      { text: '女', value: 'female' }
				    ]
			}
		},
		onLoad:function(option) {
			this.phone=option.phone
		},
		methods: {
			onchinfo(){
			   var data={
				   
			   }
			    if(this.userName!=''){
					data.userName=this.userName
				}
				if(this.userEmail!=''){
					data.userEmail=this.userEmail
				}
				if(this.userIDNumber!=''){
					data.userIDNumber=this.userIDNumber
				}
				if(this.socialInsureNum!=''){
					data.socialInsureNum=this.socialInsureNum
				}
				if(this.userHeight!=''){
					data.userHeight=parseInt(this.userHeight)
					//data.userAge=parseInt(this.userAge);
				}
				if(this.userWeight!=''){
					data.userWeight=parseInt(this.userWeight)
				}
				if(this.userAge!=''){
					data.userAge=parseInt(this.userAge)
				}
				if(this.selected != ''){
					this.userGender = this.selected;
					data.userGender = this.userGender
					console.log(data.userGender)
				}
				console.log(data)
				
				putchinfo(this.phone, data).then((res)=>{
						if(res.st==0){
							this.logout();
							getUserInfo(this.phone).then((res)=>{
								console.log(res)
								this.login(res.data);
								this.title='修改成功!'
								uni.navigateBack();
								//this.logout()
							})
						}
						else{
							this.title='修改失败'
						}
					})
			},
			...mapMutations(['login' ,'logout'])
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
