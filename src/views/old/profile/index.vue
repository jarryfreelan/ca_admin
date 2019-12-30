<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="12" lg="12">
        <personal-info-card />
      </b-col>
      <b-col sm="12" lg="12">
        <password-login-card />
      </b-col>
      <b-col sm="12" lg="12">
        <password-security-card />
      </b-col>
      <b-col sm="12" lg="12">
        <coin-payments-card />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import PersonalInfoCard from './personalInfo'
import PasswordLoginCard from './passwordLogin'
import PasswordSecurityCard from './passwordSecurity'
import CoinPaymentsCard from './coinpayment'

export default {
  name: 'profile',
  components: {
    PersonalInfoCard,
    PasswordLoginCard,
    PasswordSecurityCard,
    CoinPaymentsCard,
  },
  data: () => {
    return { 
    }
  }
}
</script>
