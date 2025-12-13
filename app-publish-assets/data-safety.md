# Data Safety - Google Play Console

## Data Collection and Usage

### Data Collected

#### User Account Information
**Data Type:** Email address
**Purpose:** Authentication and account management
**Collection:** Required for account creation
**Sharing:** Not shared with third parties
**Optional/Required:** Required
**User Control:** Users can delete account at any time
**Encryption:** Encrypted in transit using HTTPS/TLS
**Storage:** Stored securely in Firebase Authentication

#### App Activity
**Data Type:**
- Discovery history
- Analysis results
- Achievement progress
- Learning progress
- App interactions
- Feature usage

**Purpose:**
- Provide core app functionality
- Track user progress and achievements
- Improve user experience
- Display personalized content

**Collection:** Automatically collected during app usage
**Sharing:** Aggregated analytics shared with Firebase Analytics, Microsoft Clarity, Amplitude
**Optional/Required:** Required for app functionality
**User Control:** Can be reset by deleting account
**Encryption:** Encrypted in transit and at rest
**Storage:** Stored in Firebase Firestore database

#### Device Information
**Data Type:**
- Device model
- Operating system version
- App version
- Screen size
- Browser type

**Purpose:**
- App analytics and crash reporting
- Optimize app performance
- Debug technical issues
- Ensure compatibility

**Collection:** Automatically collected
**Sharing:** Shared with Firebase Analytics, Microsoft Clarity, Amplitude
**Optional/Required:** Required
**User Control:** Cannot be disabled
**Encryption:** Encrypted in transit
**Storage:** Stored in analytics platforms

#### App Performance Data
**Data Type:**
- Crash logs
- Performance metrics
- Load times
- Error reports

**Purpose:**
- Monitor app stability
- Improve performance
- Fix bugs and crashes

**Collection:** Automatically collected
**Sharing:** Shared with Firebase Crashlytics
**Optional/Required:** Required
**User Control:** Cannot be disabled
**Encryption:** Encrypted in transit
**Storage:** Stored in Firebase Crashlytics

### Data Not Collected

The app DOES NOT collect:
- Name or physical address
- Phone number
- Payment information
- Credit card details
- Precise location
- Photos or videos (unless user explicitly uploads for analysis)
- Audio files
- Calendar data
- Contacts
- SMS or call logs
- Health data
- Financial information
- Personal identifiers beyond email

## Data Sharing

### Third-Party Analytics Services

#### Firebase Analytics (Google)
**Purpose:** App analytics and user behavior tracking
**Data Shared:** App activity, device information, performance metrics
**Privacy Policy:** https://firebase.google.com/support/privacy

#### Microsoft Clarity
**Purpose:** User experience analytics and session recording
**Data Shared:** App interactions, anonymized usage patterns
**Privacy Policy:** https://privacy.microsoft.com/privacystatement

#### Amplitude
**Purpose:** Product analytics and user engagement tracking
**Data Shared:** App events, feature usage, user journey data
**Privacy Policy:** https://amplitude.com/privacy

### Data Not Sold
No user data is sold to third parties for any purpose.

### Data Not Shared for Advertising
User data is not shared with advertising networks or used for targeted advertising.

## Security Practices

### Data Encryption
- **In Transit:** All data transmitted between app and servers uses HTTPS/TLS encryption
- **At Rest:** User data stored in Firebase is encrypted at rest

### Data Deletion
Users can request complete data deletion through:
1. In-app account deletion feature
2. Data deletion request page: https://exohunter-ai.web.app/data-deletion
3. Email request to: aoneahsan@gmail.com

Account deletion process:
- Removes all personal information
- Deletes discovery history and progress
- Removes authentication credentials
- Cannot be undone
- Completed within 30 days

### Data Retention
- Active accounts: Data retained indefinitely
- Deleted accounts: Data permanently deleted within 30 days
- Analytics data: Aggregated data retained for service improvement

### Access Controls
- User authentication required for personal data access
- Firebase Security Rules enforce data access permissions
- API requests authenticated and rate-limited

## User Rights

### Access Your Data
Users can view all their data through the app dashboard and profile sections.

### Export Your Data
Users can request data export by contacting: aoneahsan@gmail.com

### Delete Your Data
Users can delete their account and all associated data:
1. Via in-app settings
2. Through data deletion page: https://exohunter-ai.web.app/data-deletion
3. By email request: aoneahsan@gmail.com

### Modify Your Data
Users can update their profile information and preferences through app settings.

## Children's Privacy

The app is appropriate for users aged 13 and above. We do not knowingly collect personal information from children under 13. If we discover data from a child under 13, we will delete it immediately.

## Google Play Data Safety Questionnaire Answers

### Does your app collect or share any of the required user data types?
**Answer:** Yes

### Data Types - Responses

#### Location
**Approximate location:** No
**Precise location:** No

#### Personal Info
**Name:** No
**Email address:** Yes - Required, Not shared, Account management
**User IDs:** Yes - Required, Shared with analytics, App functionality
**Address:** No
**Phone number:** No
**Race and ethnicity:** No
**Political or religious beliefs:** No
**Sexual orientation:** No
**Other info:** No

#### Financial Info
**User payment info:** No
**Purchase history:** No
**Credit score:** No
**Other financial info:** No

#### Health and Fitness
**Health info:** No
**Fitness info:** No

#### Messages
**Emails:** No
**SMS or MMS:** No
**Other in-app messages:** No

#### Photos and Videos
**Photos:** No (user may optionally upload for analysis only)
**Videos:** No

#### Audio Files
**Voice or sound recordings:** No
**Music files:** No
**Other audio files:** No

#### Files and Docs
**Files and docs:** No (user may optionally upload CSV files for analysis only)

#### Calendar
**Calendar events:** No

#### Contacts
**Contacts:** No

#### App Activity
**App interactions:** Yes - Required, Shared with analytics, Analytics
**In-app search history:** Yes - Required, Not shared, App functionality
**Installed apps:** No
**Other user-generated content:** Yes - Required, Not shared, App functionality
**Other actions:** Yes - Required, Shared with analytics, Analytics

#### Web Browsing
**Web browsing history:** No

#### App Info and Performance
**Crash logs:** Yes - Required, Shared with Firebase, Analytics
**Diagnostics:** Yes - Required, Shared with Firebase, Analytics
**Other app performance data:** Yes - Required, Shared with analytics, Analytics

#### Device or Other IDs
**Device or other IDs:** Yes - Required, Shared with analytics, Analytics

### Is all of the user data collected by your app encrypted in transit?
**Answer:** Yes

### Do you provide a way for users to request that their data is deleted?
**Answer:** Yes

## Compliance

### GDPR Compliance
The app complies with EU General Data Protection Regulation (GDPR) requirements:
- Legal basis for processing: User consent and legitimate interest
- Right to access, rectification, deletion, and portability
- Data protection by design and default
- Privacy policy and terms clearly presented

### CCPA Compliance
The app complies with California Consumer Privacy Act (CCPA):
- Disclosure of data collection practices
- Right to opt-out of data sale (not applicable - we don't sell data)
- Right to deletion
- Non-discrimination for exercising privacy rights

### App Store Privacy Nutrition Labels
Data types reported in App Store privacy labels match this document.

## Updates to Data Practices

This document reflects current data practices as of December 2024. Users will be notified of material changes to data collection or usage through:
- In-app notifications
- Updated privacy policy
- App store listing updates

## Contact Information

For questions about data practices:
- Email: aoneahsan@gmail.com
- Phone: +923046619706
- Privacy Policy: https://exohunter-ai.web.app/privacy
- Data Deletion: https://exohunter-ai.web.app/data-deletion

Last Updated: December 2024
