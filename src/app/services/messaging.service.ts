export class MessagingService {

  displayError:   boolean = false;
  displaySuccess: boolean = false;
  displayInfo:    boolean = false;

  errorMessage:   string = '';
  successMessage: string = '';
  infoMessage:    string = '';

  onError ( errorMessage ) {
    this.displayError = true;
    this.errorMessage = errorMessage;
    setTimeout( () => {
      this.displayError = false;
      this.errorMessage = '';
    }, 7000 );
  }

  onSuccess ( successMessage ) {
    this.displaySuccess = true;
    this.successMessage = successMessage;
    setTimeout( () => {
      this.displaySuccess = false;
      this.successMessage = '';
    }, 3000 );
  }

  onInfo ( infoMessage ) {
    this.displayInfo = true;
    this.infoMessage = infoMessage;
    setTimeout( () => {
      this.displayInfo = false;
      this.infoMessage = '';
    }, 3000 );
  }
}
