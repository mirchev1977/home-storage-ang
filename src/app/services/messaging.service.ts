export class MessagingService {

  displayError:   boolean = false;
  displaySuccess: boolean = false;

  errorMessage:   string = '';
  successMessage: string = '';

  onError ( errorMessage ) {
    this.displayError = true;
    this.errorMessage = errorMessage;
    setTimeout( () => {
      this.displayError = false;
      this.errorMessage = '';
    }, 5000 );
  }

  onSuccess ( successMessage ) {
    this.displaySuccess = true;
    this.successMessage = successMessage;
    setTimeout( () => {
      this.displaySuccess = false;
      this.successMessage = '';
    }, 1000 );
  }
}
