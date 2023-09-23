import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NavController } from '@ionic/angular';
import firebase1 from 'firebase/compat/app';
import { IonLoaderService } from '../ion-loader.service';
import { AlertController } from '@ionic/angular';





@Component({
  selector: 'app-admindash',
  templateUrl: './admindash.page.html',
  styleUrls: ['./admindash.page.scss'],
})
export class AdmindashPage implements OnInit {
  language: string = this.translateService.currentLang;
  isModalOpen = false;
  childData:any
  result:any
  selectedKey:any
  date: string;
  description: string;
  tag: string;
  title: string;
  isReadOnly: boolean;
  selectedPost: any;


  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }


  constructor(private translateService: TranslateService,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController,
    private ionLoaderService: IonLoaderService,
    private alertController: AlertController

    ) { }
    blogs: any[] = [];
    blogs1: any[] = [];
    view=false

  ngOnInit() {

  }
  showLoader() {
    this.ionLoaderService.simpleLoader();
  }
  hideLoader() {
    this.ionLoaderService.dismissLoader();
  }
  customizeLoader(message:any) {
    this.ionLoaderService.customLoader(message);
  }
  OpenToastDanger(message:any){
    this.ionLoaderService.openToastDanger(message);
  }
  OpenToast(message:any){
    this.ionLoaderService.openToast(message);
  }

  handleRefresh(event:any) {
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }
  languageChange() { 
    this.translateService.use(this.language);
  }
  logoutUser() {
    return new Promise(async (resolve, reject) => {
      if (await this.afAuth.currentUser) {
        this.afAuth.signOut()
          .then(() => {
            console.log("LOG Out");
            this.navCtrl.navigateForward('/admin');
          }).catch((error) => {
            reject();
          });
      }
    })
  }
  addpost(){
    this.navCtrl.navigateForward('/addpost')
  }
  

  getblog() {
    this.customizeLoader('Getting Blogs')
  this.view = true;
  this.blogs = [];
  this.result = null;
  const keys: any[] = [];

  firebase1.database().ref('posts').on('value', snapshot => {
    this.result = snapshot.val();
    snapshot.forEach(childSnapshot => {
      const key = childSnapshot.key;
      const childData = childSnapshot.val();
      childData.key = key;
      keys.push(key);
      console.log(childData);
    });

    console.log(this.result);
    if(this.result == null){
      this.hideLoader()
      this.OpenToastDanger('No Blogs')
    }else{
      this.hideLoader()
      this.OpenToast('Updated Recent Blogs')
    }

    this.blogs.length = 0;

    for (let i in this.result) {
      const element = this.result[i];
      const index = keys.indexOf(i);
      const post = {
        date: element.date,
        description: element.description,
        tag: element.tag,
        title: element.title,
        key: keys[index]
      };
      this.blogs.push(post);
      console.log('pushed');
      this.hideLoader();
    }
  });
}


postdetails(post: any){
  this.setOpen(true);
  this.selectedPost = post; 
  this.isReadOnly = true; 
  let post1={
    date:post.date,
    description:post.description,
    tag:post.tag,
    title:post.title,
    key: post.key
  };
  this.blogs1.push(post1);
}
toggleReadOnly() {
  this.isReadOnly = false;
}
async updateBlog(post: any) {
  const user = firebase1.auth().currentUser;
  if (user && user.email && user.email.endsWith('@admin.com')) {
    const alert = await this.alertController.create({
      header: 'Confirm update',
      message: 'Are you sure you want to update this post?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Update',
          handler: () => {
            const postRef = firebase1.database().ref(`posts/${post.key}`);
            const updates = {           
               title: post.title,
               description:post.description,
              tag: post.tag
            };
            
            postRef.update(updates)
              .then(() => {
                console.log('Post updated successfully');
                const index = this.blogs.findIndex((p) => p.key === post.key);
                if (index !== -1) {
                  this.blogs[index] = post;
                }
                this.setOpen(false)
                this.OpenToast('Updated !!')
              })
              .catch((error) => {
                console.error('Error updating post:', error);
                this.setOpen(false)
                this.OpenToastDanger('Failed !!')
              });
          }
        }
      ]
    });
    await alert.present();
  } else {
    console.error('User is not authorized to update posts');
    this.OpenToastDanger('User is not authorized to update posts')
  }
}


async deleteBlog(postKey: string) {
  const user = firebase1.auth().currentUser;
  if (user && user.email && user.email.endsWith('@admin.com')) {
    const alert = await this.alertController.create({
      header: 'Confirm delete',
      message: 'Are you sure you want to delete this post?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: () => {
            const postRef = firebase1.database().ref(`posts/${postKey}`);
            postRef.remove()
              .then(() => {
                console.log('Post deleted successfully');
                this.OpenToastDanger('Deleted !!')

                this.blogs = this.blogs.filter((post) => post.key !== postKey);
              })
              .catch((error) => {
                console.error('Error deleting post:', error);
              });
          }
        }
      ]
    });
    await alert.present();
  } else {
    console.error('User is not authorized to delete posts');
  }
}








}
